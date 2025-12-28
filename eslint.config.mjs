import { tsEslintConfig } from "zm-eslint-config/typescript";

const customeIgnores = [
  "src/schema/generated-schema-types.ts"
];

export default [
	...tsEslintConfig.map(cfg => ({
		...cfg,
		ignores: [...(cfg.ignores || []), ...customeIgnores],
	}))
];
