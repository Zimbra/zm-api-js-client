import { expect } from 'chai';
import { ZimbraBatchClient } from '../../src/batch-client';

/* global describe, it */

describe('batch-client/getFolder()', function () {
	this.timeout(2000);

	for (const parents of [[], ['Personal'], ['Trash', 'NestedCheck'], ['Personal', 'Projects', 'Archive', 'Later']]) {
		it(`should resolve shared descendants under /${parents.join('/')}`, async function () {
			const response = createResponse(parents);
			const root = await getFolder(response);
			const { parent, link } = findLink(root, parents);
			const mountedPath = `/${[...parents, 'granter ShareCheck'].join('/')}`;
			expect(link.absFolderPath, 'Verify the accepted mount path is retained').to.equal(mountedPath);
			expect(link.folders[0].absFolderPath, 'Verify the child uses the recipient mount path')
				.to.equal(`${mountedPath}/ChildCheck`);
			expect(link.folders[0].folders[0].absFolderPath, 'Verify the grandchild uses the recipient mount path')
				.to.equal(`${mountedPath}/ChildCheck/Grandchild`);
			expect(link, 'Verify mount identity and read-only permissions are retained').to.include({
				id: 'local-link', parentFolderId: parent.id, ownerZimbraId: 'owner-id', sharedItemId: 'owner-share',
				name: 'granter ShareCheck', oname: 'ShareCheck', permissions: 'r', view: 'message'
			});
			expect(link.folders[0], 'Verify owner child identity and permissions are retained').to.include({
				id: 'owner-id:owner-child', parentFolderId: 'owner-id:owner-share', permissions: 'r', unread: 1
			});
			expect(link.folders[0].acl, 'Verify the child ACL is retained').to.deep.equal({
				grant: [{ zimbraId: 'recipient-id', granteeType: 'usr', permissions: 'r' }]
			});
			expect(root.folders[0], 'Verify ordinary sibling folders are unchanged').to.include({
				id: 'personal-sibling', name: 'Unrelated', absFolderPath: '/Unrelated', parentFolderId: '1'
			});
		});
	}


	for (const permissions of ['rwidx', 'rwidxa']) {
		it(`should preserve ${permissions} rights beneath nested Trash`, async function () {
			const parents = ['Trash', 'NestedCheck'];
			const response = createResponse(parents);
			response.folder[0].folder[1].folder[0].link[0].perm = permissions;
			const { link } = findLink(await getFolder(response), parents);
			expect(link.permissions, 'Verify traversal does not change manager or administrator rights').to.equal(permissions);
			expect(link.folders[0].absFolderPath, 'Verify writable shares use the same recipient path')
				.to.equal('/Trash/NestedCheck/granter ShareCheck/ChildCheck');
		});
	}


	it('should retain root contact mount identity conversion', async function () {
		const response = createResponse([]);
		response.folder[0].link[0].view = 'contact';
		const { link } = findLink(await getFolder(response), []);
		expect(link, 'Verify existing contact mount identity conversion is preserved').to.include({
			id: 'owner-id:owner-share', userId: 'local-link', sharedItemId: 'owner-share', ownerZimbraId: 'owner-id'
		});
		expect(link.folders[0].absFolderPath, 'Verify root contact descendants still use the accepted name')
			.to.equal('/granter ShareCheck/ChildCheck');
	});


	it('should retain root whole-mailbox mount path handling', async function () {
		const response = createResponse([]);
		const rawLink = response.folder[0].link[0];
		rawLink.oname = 'USER_ROOT';
		rawLink.folder[0].absFolderPath = '/Inbox';
		const { link } = findLink(await getFolder(response), []);
		expect(link.folders[0].absFolderPath, 'Verify whole-mailbox mount retains the owner-relative path')
			.to.equal('/granter ShareCheck/Inbox');
	});


	it('should leave descendants unchanged when the original share name is missing', async function () {
		const response = createResponse(['Trash', 'NestedCheck']);
		delete response.folder[0].folder[1].folder[0].link[0].oname;
		const { link } = findLink(await getFolder(response), ['Trash', 'NestedCheck']);
		expect(link.folders[0].absFolderPath, 'Verify incomplete mount data does not trigger a path rewrite')
			.to.equal('/ShareCheck/ChildCheck');
	});


	it('should accept a nested mount without expanded descendants', async function () {
		const response = createResponse(['Trash', 'NestedCheck']);
		delete response.folder[0].folder[1].folder[0].link[0].folder;
		const { link } = findLink(await getFolder(response), ['Trash', 'NestedCheck']);
		expect(link.absFolderPath, 'Verify an unexpanded mount keeps its saved path')
			.to.equal('/Trash/NestedCheck/granter ShareCheck');
		expect(link.folders, 'Verify no descendant list is invented').to.equal(undefined);
	});


	it('should accept a mailbox with no ordinary or linked folders', async function () {
		const root = await getFolder({ folder: [{ id: '1', name: 'USER_ROOT', absFolderPath: '/' }] });
		expect(root, 'Verify an empty mailbox remains intact').to.deep.equal({
			id: '1', name: 'USER_ROOT', absFolderPath: '/'
		});
	});
});

async function getFolder(response) {
	const client = new ZimbraBatchClient();
	// Stub only the transport; exercise request mapping, SOAP normalization and real folder processing.
	client.jsonRequest = async request => {
		expect(request.name, 'Verify the real get-folder pipeline requests GetFolder').to.equal('GetFolder');
		return response;
	};
	const result = await client.getFolder({});
	expect(result.folders, 'Verify the SOAP root was normalized').to.have.lengthOf(1);
	return result.folders[0];
}

function findLink(root, parents) {
	let parent = root;
	for (const name of parents) {
		parent = parent.folders.find(folder => folder.name === name);
		expect(parent, `Verify recipient parent ${name} exists`).to.be.an('object');
	}
	expect(parent.linkedFolders, 'Verify the normalized mount exists').to.have.lengthOf(1);
	return { parent, link: parent.linkedFolders[0] };
}

function createResponse(parents) {
	// Synthetic SOAP data only: no server, credentials or remote test resources are used.
	const root = { id: '1', name: 'USER_ROOT', absFolderPath: '/', folder: [{
		id: 'personal-sibling', name: 'Unrelated', absFolderPath: '/Unrelated', l: '1'
	}] };
	let parent = root;
	for (const [index, name] of parents.entries()) {
		const folder = { id: `parent-${index}`, name, l: parent.id,
			absFolderPath: `/${parents.slice(0, index + 1).join('/')}`, folder: [] };
		parent.folder.push(folder);
		parent = folder;
	}
	parent.link = [{
		id: 'local-link', l: parent.id, name: 'granter ShareCheck', oname: 'ShareCheck', view: 'message',
		absFolderPath: `/${[...parents, 'granter ShareCheck'].join('/')}`, zid: 'owner-id', rid: 'owner-share', perm: 'r',
		folder: [{
			id: 'owner-id:owner-child', l: 'owner-id:owner-share', name: 'ChildCheck', view: 'message',
			absFolderPath: '/ShareCheck/ChildCheck', perm: 'r', u: 1,
			acl: { grant: [{ zid: 'recipient-id', gt: 'usr', perm: 'r' }] },
			folder: [{ id: 'owner-id:owner-grandchild', l: 'owner-id:owner-child', name: 'Grandchild',
				absFolderPath: '/ShareCheck/ChildCheck/Grandchild', view: 'message', perm: 'r' }]
		}]
	}];
	return { folder: [root] };
}
