import { tsEslintConfig } from "@zimbra/eslint-config/typescript";

const customIgnores = ["src/schema/generated-schema-types.ts"];

export default [
	...tsEslintConfig.map(cfg => ({
		...cfg,
		ignores: [...(cfg.ignores || []), ...customIgnores],
	}))
];