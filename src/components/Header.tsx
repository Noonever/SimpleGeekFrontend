import * as React from 'react';

import { useNavigate } from 'react-router-dom'
import { Badge, styled } from '@mui/material';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
    Menu as MenuIcon,
    Search,
    Close,
    Info,
    Favorite,
    Person,
    ShoppingCart,
    ChevronRight
} from '@mui/icons-material';

import logo from '../assets/logo.png';
import { Box } from '@mui/system';
import { UserState } from '../UserContext';
import { getImageLink } from '../utils/image';

interface Props {
    userState: UserState,
    onLoginClick: () => void,
}

export default function Header({ userState, onLoginClick }: Props) {

    const navigate = useNavigate()
    const [anchorElCatalog, setAnchorElCatalog] = React.useState<null | HTMLElement>(null);
    const [searchedText, setSearchedText] = React.useState('');
    const catalogOpen = Boolean(anchorElCatalog);

    const totalCartItems = userState.cart.length
    const totalFavoriteItems = userState.favorites.length


    const SectionButton = ({ text, icon, onClick, badgeCount }: { text: string, icon: React.ReactNode, onClick: () => void, badgeCount?: number }) => {

        const SectionButtonWrapper = styled('div')({
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
            cursor: 'pointer',
        })

        const SectionIconWrapper = ({ children }: { children: React.ReactNode }) => (
            <Box
                sx={{
                    position: 'relative',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'icon.secondary',
                }}>
                {children}
            </Box>
        )


        return (
            <SectionButtonWrapper onClick={onClick}>
                <SectionIconWrapper>
                    <Badge color="warning" badgeContent={badgeCount} >
                        {icon}
                    </Badge>
                </SectionIconWrapper>
                <Typography sx={{ color: 'text.secondary' }} variant="body2">{text}</Typography>
            </SectionButtonWrapper>
        )
    }

    const CatalogImageWrapper = styled('div')({
        width: 56,
        height: 56,
        borderRadius: 8,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        position: "relative"
    })

    const handleOpenCatalog = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCatalog(event.currentTarget);
    };

    const handleCloseCatalog = () => {
        setAnchorElCatalog(null);
    };

    const handleChangeSearchedText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedText(event.target.value);
    }

    const performSearch = () => {
        navigate(`/cataolg/search?q=${searchedText}`)
    }

    return (
        <div style={{
            padding: "0 calc(24/1920 * 100%)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "white",
        }}>
            <header style={{
                flexGrow: 1,
                paddingTop: 32,
                paddingBottom: 24,
                maxWidth: 1408,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 24,
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 40,
                    alignItems: 'center',
                    width: "100%",
                }}>
                    <div style={{ cursor: "pointer" }} onClick={() => navigate('/', { replace: true })}>
                        <img src={logo} height={88} alt='logo' />
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        gap: 24,
                        height: 56,
                        width: "100%",
                        maxWidth: 810,
                    }}>
                        <Button
                            id="catalog-button"
                            variant="contained"
                            size='large'
                            style={{ gap: 8, minWidth: 143 }}
                            aria-controls={catalogOpen ? 'catalog-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={catalogOpen ? 'true' : undefined}
                            onClick={handleOpenCatalog}
                        >
                            {catalogOpen ? <Close sx={{ color: "icon.primary" }} /> : <MenuIcon sx={{ color: "icon.primary" }} />}
                            <Typography>Каталог</Typography>
                        </Button>

                        <Menu
                            id="catalog-menu"
                            anchorEl={anchorElCatalog}
                            open={catalogOpen}
                            onClose={handleCloseCatalog}
                            MenuListProps={{
                                'aria-labelledby': 'catalog-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                handleCloseCatalog()
                                navigate("/catalog/minifigures", { replace: true });

                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12
                                }}>
                                    <CatalogImageWrapper>
                                        <img src={getImageLink('figurka1')}></img>
                                    </CatalogImageWrapper>
                                    <Typography variant='body1'>
                                        Фигурки
                                    </Typography>
                                </div>
                                <ChevronRight />
                            </MenuItem>

                            <MenuItem onClick={() => {
                                handleCloseCatalog()
                                navigate("/catalog/vinyl", { replace: true });

                            }}>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 12
                                }}>
                                    <CatalogImageWrapper>
                                        <img src={getImageLink('vinyl1')}></img>
                                    </CatalogImageWrapper>
                                    <Typography variant='body1'>
                                        Виниловые пластинки
                                    </Typography>
                                </div>
                                <ChevronRight />
                            </MenuItem>
                        </Menu>

                        <div style={{
                            borderRadius: 12,
                            maxWidth: 440,
                            width: "100%",
                            position: 'relative',
                        }}>
                            <TextField
                                label="Поиск"
                                variant="filled"
                                style={{ width: '100%' }}
                                color='warning'
                                value={searchedText}
                                InputProps={{
                                    disableUnderline: true,
                                    style: {
                                        borderRadius: 12,
                                        paddingRight: 56,

                                    }
                                }}
                                onChange={handleChangeSearchedText}
                            />

                            <Button
                                variant="contained"
                                onClick={performSearch}
                                style={{
                                    minWidth: 0,
                                    width: 56,
                                    height: 56,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    zIndex: 1,
                                }}
                            >
                                <Search sx={{ color: "icon.primary" }} />
                            </Button>

                        </div>
                    </div>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: 16,
                    alignItems: 'center'
                }}>
                    <SectionButton
                        text='FAQ'
                        icon={<Info />}
                        onClick={() => navigate('/faq', { replace: true })}
                    />

                    <SectionButton
                        text='Избранное'
                        icon={<Favorite />}
                        onClick={() => navigate('/favorites', { replace: true })}
                        badgeCount={totalFavoriteItems}
                    />

                    <SectionButton
                        text={userState.session?.identity ? "Профиль" : "Войти"}
                        icon={<Person />}
                        onClick={userState.session?.identity ? () => navigate("/profile", { replace: true }) : () => onLoginClick()}
                    />

                    <SectionButton
                        text='Корзина'
                        icon={<ShoppingCart />}
                        onClick={() => navigate('/cart', { replace: true })}
                        badgeCount={totalCartItems}
                    />
                </div>
            </header>
        </div >
    );
}