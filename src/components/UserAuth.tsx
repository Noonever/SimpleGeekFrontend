import { useCallback, useEffect, useState } from "react";
import { oryApi } from "../oryApi";
import { LoginFlow, RegistrationFlow, UpdateLoginFlowBody, UpdateRegistrationFlowBody } from "@ory/client";
import { Button, DialogTitle, IconButton, TextField, Typography, styled } from "@mui/material";
import { ArrowBack, Close } from "@mui/icons-material";
import { AxiosError } from "axios";
import { PasswordInput } from "./PasswordInput";
import { BaseInput } from "./BaseInput";

type UserAuthSection = "start" | "login" | "registration" | null


interface UserCardHeaderProps {
    title: string,
    onBackClick?: () => void
    onClose: () => void
}

const UserCardWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: 'max-content',
    borderRadius: 16,
    backgroundColor: 'white',
})

const UserCardHeader = ({ title, onBackClick, onClose }: UserCardHeaderProps) => {
    return (

        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
            padding: "0 24px",
        }}>
            <IconButton onClick={onBackClick} disabled={!onBackClick}>
                <ArrowBack sx={onBackClick ? {} : { opacity: '0' }} />
            </IconButton>
            <DialogTitle>
                {title}
            </DialogTitle>
            <IconButton onClick={onClose}>
                <Close />
            </IconButton>
        </div>
    )
}

const UserCardInputsWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    padding: "16px 16px 24px 16px",
})

interface UserActionButtonProps {
    buttonText: string,
    onClick: () => void,
    isLoading: boolean,
}

const UserCardActionButtonSection = ({ buttonText, onClick, isLoading }: UserActionButtonProps) => {
    return (
        <div style={{
            padding: "0px 16px 16px 16px",
        }}>
            <Button sx={{ width: "100%" }} variant="contained" onClick={onClick}>
                {
                    isLoading ? "Загрузка..." : buttonText
                }
            </Button>
        </div>
    )
}

const UserCardSocialsLoginSection = () => {

    return (
        <>
            <div style={{
                padding: "8px 16px 16px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <Typography variant="body2" color="typography.disabled">
                    или войти с помощью
                </Typography>
            </div>
            <div style={{
                padding: "0px 16px 16px 16px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 16,
            }}>
                <Button variant="contained">
                    Я
                </Button>
                <Button variant="contained">
                    ВК
                </Button>
                <Button variant="contained">
                    ТГ
                </Button>
            </div>
        </>
    )
}

interface UserAuthCardProps {
    isOpened: boolean,
    onClose: () => void,
    onLoggedIn: () => void,
    onRegistered: () => void,
    onPasswordForgotClick: () => void,
}

export default function UserAuthCard({
    isOpened,
    onClose,
    onLoggedIn,
    onRegistered,
    onPasswordForgotClick,
}: UserAuthCardProps) {

    const [section, setSection] = useState<UserAuthSection>()

    const [userIdentifier, setUserIdentifier] = useState<string>('')
    const [userIdentifierError, setUserIdentifierError] = useState<string | null>(null)

    const [loginPassword, setLoginPassword] = useState<string | null>(null)
    const [loginPasswordError, setLoginPasswordError] = useState<string | null>(null)

    const [registrationPassword, setRegistrationPassword] = useState<string | null>(null)
    const [registrationPasswordError, setRegistrationPasswordError] = useState<string | null>(null)
    const [registrationPasswordConfirm, setRegistrationPasswordConfirm] = useState<string | null>(null)
    const [registrationPasswordConfirmError, setRegistrationPasswordConfirmError] = useState<string | null>(null)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [csrf, setCsrf] = useState<string | null>(null)
    const [loginFlow, setLoginFlow] = useState<LoginFlow | null>(null)
    const [registrationFlow, setRegistrationFlow] = useState<RegistrationFlow | null>(null)

    useEffect(() => {
        if (isOpened) {
            setSection('start')
        } else {
            setSection(null)
        }
    }, [isOpened])

    async function isRegistered(email: string) {
        const mockedUserEmails = [
            "kek@kek.kek",
        ]
        return mockedUserEmails.includes(email)
    };

    function getCSRF(flow: LoginFlow | RegistrationFlow): string | null {
        // @ts-ignore
        // TODO: fix types
        const csrfUiNode = flow.ui.nodes.find((node) => node.attributes?.name === "csrf_token");
        // @ts-ignore
        // TODO: fix types
        const csrfToken = csrfUiNode?.attributes?.value;
        return csrfToken || null;
    };

    // Get the flow bas ed on the flowId
    const getLoginFlow = useCallback(
        (flowId: string) =>
            oryApi
                // the flow data contains the form fields, error messages and csrf token
                .getLoginFlow({ id: flowId })
                .then(({ data: flow }) => {
                    setCsrf(getCSRF(flow));
                    setLoginFlow(flow);
                })
                .catch((error) => {
                    console.warn(error);
                    console.warn('Login flow not found, creating new one...');
                    createLoginFlow();
                    Promise.resolve();
                }),
        [],
    );

    const createLoginFlow = () => {
        oryApi
            .createBrowserLoginFlow()
            .then(({ data: flow }) => {
                setCsrf(getCSRF(flow));
                setLoginFlow(flow);
                console.warn(`Login flow created.\nID: ${flow.id}\n CSRF: ${getCSRF(flow)}`);
            })
            .catch((error) => console.warn(error));

    };

    const getRegistrationFlow = (flowId: string) => {
        oryApi
            // the flow data contains the form fields, error messages and csrf token
            .getRegistrationFlow({ id: flowId })
            .then(({ data: flow }) => {
                setCsrf(getCSRF(flow));
                setRegistrationFlow(flow);
            })
            .catch((error) => {
                console.warn(error);
                console.warn('Registration flow not found, creating new one...');
                createRegistrationFlow();
                Promise.resolve();
            });
    };

    const createRegistrationFlow = () => {
        oryApi
            // we don't need to specify the return_to here since we are building an SPA. In server-side browser flows we would need to specify the return_to
            .createBrowserRegistrationFlow()
            .then(({ data: flow }) => {
                setCsrf(getCSRF(flow));
                setRegistrationFlow(flow)
            })
            .catch((error) => console.warn(error));
        console.warn('New registration flow created');
    };

    const handleStartAction = async () => {
        if (section !== 'start') return
        if (!userIdentifier) {
            setUserIdentifierError('Поле не заполнено')
            return
        }
        if (/^.+@.+$/.test(userIdentifier) === false) {
            setUserIdentifierError('Некорректная почта')
            return
        }
        setIsLoading(true)
        if (await isRegistered(userIdentifier)) {
            getLoginFlow(loginFlow?.id ?? "")
            setSection('login')
            setRegistrationPassword(null)
            setRegistrationPasswordConfirm(null)
        } else {
            getRegistrationFlow(registrationFlow?.id ?? "")
            setSection('registration')
            setLoginPassword(null)
        }
        setIsLoading(false)
    };

    const handleLoginAction = async () => {
        if (section !== 'login') return
        if (!loginFlow) { console.log('no login flow'); return }
        if (!userIdentifier) { console.log('no user identifier'); return }
        if (!loginPassword) { setLoginPasswordError('Поле не заполнено'); return }
        if (!csrf) { console.log('no csrf'); return }

        const body: UpdateLoginFlowBody = {
            method: "password",
            identifier: userIdentifier,
            password: loginPassword,
            csrf_token: csrf,
        }

        setIsLoading(true)
        oryApi
            .updateLoginFlow({ flow: loginFlow.id, updateLoginFlowBody: body })
            .then(() => {
                onLoggedIn();
            })
            .catch((error) => {
                console.warn(error);
                const responseData = (error as AxiosError).response?.data
                console.warn('Login failed');
                setLoginPasswordError('Неверный пароль');
            })
            .finally(() => setIsLoading(false));
    };

    const handleRegistrationAction = async () => {
        if (section !== 'registration') return
        if (!registrationFlow) { console.log('no registration flow'); return }
        if (!userIdentifier) { console.log('no user identifier'); return }
        if (!csrf) { console.log('no csrf'); return }

        if (!registrationPassword) {
            setRegistrationPasswordError('Поле не заполнено')
            return
        }
        if (registrationPassword.length < 6) {
            setRegistrationPasswordError('Пароль должен содержать не менее 6 символов')
            return
        }
        if (!registrationPasswordConfirm) {
            setRegistrationPasswordConfirmError('Поле не заполнено')
            return
        }
        if (registrationPassword !== registrationPasswordConfirm) {
            setRegistrationPasswordError('Пароли не совпадают')
            setRegistrationPasswordConfirmError('Пароли не совпадают')
            return
        }

        const body: UpdateRegistrationFlowBody = {
            method: "password",
            password: registrationPassword,
            csrf_token: csrf,
            traits: {
                email: userIdentifier,
            }
        }

        setIsLoading(true)
        oryApi
            .updateRegistrationFlow({ flow: registrationFlow.id, updateRegistrationFlowBody: body })
            .then(() => {
                onRegistered();
            })
            .catch((error) => console.warn(error))
            .finally(() => setIsLoading(false));
    };

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            display: isOpened ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <UserCardWrapper>
                {section === 'start' && (
                    <>
                        <UserCardHeader title='Вход или Регистрация' onClose={onClose} />
                        <UserCardInputsWrapper>
                            <BaseInput
                                label="Email"
                                type="email"
                                autoFocus={true}
                                autoComplete="email"
                                value={userIdentifier ?? ''}
                                onChange={(e) => {
                                    setUserIdentifier(e.target.value)
                                    setUserIdentifierError(null)
                                }}
                                errorMessage={userIdentifierError}
                            />
                        </UserCardInputsWrapper>
                        <UserCardActionButtonSection buttonText="Продолжить" onClick={handleStartAction} isLoading={isLoading} />
                        <UserCardSocialsLoginSection />
                    </>
                )}
                {section === 'login' && (
                    <>
                        <UserCardHeader title='Вход' onBackClick={() => setSection('start')} onClose={onClose} />
                        <UserCardInputsWrapper>
                            <PasswordInput
                                password={loginPassword ?? ''}
                                handlePassword={(e) => {
                                    setLoginPassword(e.target.value)
                                    setLoginPasswordError(null)
                                }}
                                errorMessage={loginPasswordError}
                                autoFocus
                            />
                        </UserCardInputsWrapper>
                        <UserCardActionButtonSection buttonText="Продолжить" onClick={handleLoginAction} isLoading={isLoading} />
                        <div style={{ paddingBottom: 16, display: "flex", justifyContent: "center" }}>
                            <Button variant="text" onClick={onPasswordForgotClick}>Не помню пароль</Button>
                        </div>
                    </>
                )}
                {section === 'registration' && (
                    <>
                        <UserCardHeader title='Регистрация' onBackClick={() => setSection('start')} onClose={onClose} />
                        <UserCardInputsWrapper>
                            <PasswordInput
                                password={registrationPassword ?? ''}
                                handlePassword={(e) => {
                                    setRegistrationPassword(e.target.value)
                                    setRegistrationPasswordError(null)
                                }}
                                errorMessage={registrationPasswordError}
                                isNew
                                autoFocus
                            />
                            <PasswordInput
                                password={registrationPasswordConfirm ?? ''}
                                handlePassword={(e) => {
                                    setRegistrationPasswordConfirm(e.target.value)
                                    setRegistrationPasswordConfirmError(null)
                                }}
                                errorMessage={registrationPasswordConfirmError}
                                isNew
                                confirmPassword
                            />
                        </UserCardInputsWrapper>
                        <UserCardActionButtonSection buttonText="Зарегистрироваться" onClick={handleRegistrationAction} isLoading={isLoading} />
                        <UserCardSocialsLoginSection />
                    </>
                )}
            </UserCardWrapper>
        </div>
    )
}