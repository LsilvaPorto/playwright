type Environment = 'dev' | 'staging';
type ScenarioTag = 'validLogin' | 'invalidLogin';
type CredentialType = 'common' | 'admin';

type Credential = {
    email: string;
    password: string;
};

export function getCredential(
    environment: Environment,
    scenarioTag: ScenarioTag,
    credentialType: CredentialType,
): Credential {

    const prefix = environment.toUpperCase();
    const scenario = scenarioTag.toUpperCase();
    const type = credentialType.toUpperCase();

    const emailKey =
        `${prefix}_${scenario}_${type}_EMAIL`;

    const passwordKey =
        `${prefix}_${scenario}_${type}_PASSWORD`;

    const email = process.env[emailKey];
    const password = process.env[passwordKey];

    if (!email || !password) {
        throw new Error(
            `Credential not found: ${emailKey} / ${passwordKey}`,
        );
    }

    return {
        email,
        password,
    };
}

export function getRegisterPassword(environment: Environment): string {
    const passwordKey = `${environment.toUpperCase()}_REGISTER_PASSWORD`;
    const password = process.env[passwordKey];

    if (!password) {
        throw new Error(`Credential not found: ${passwordKey}`);
    }

    return password;
}