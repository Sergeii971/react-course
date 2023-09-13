export default {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/src/'],
	coverageThreshold: {
		global: {
			branches: 70,
			functions: 70,
			lines: 70,
			statements: 70,
		},
	},
	transformIgnorePatterns: ['^.+\\.scss$'],
	moduleNameMapper: {
		'^.+\\.scss$': 'identity-obj-proxy',
		'^@/(.*)': '<rootDir>/src/$1',
	},
	collectCoverageFrom: ['<rootDir>/src/**/*.{ts,tsx}'],
	moduleDirectories: ['node_modules', 'src'],
	modulePaths: ['<rootDir>'],
	setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
	coveragePathIgnorePatterns: [
		'<rootDir>/src/main.tsx',
		'<rootDir>/src/models/',
		'<rootDir>/src/redux/store/',
		'<rootDir>/src/api/',
		'\\.stories.tsx',
		'\\.d.ts',
	],
};
