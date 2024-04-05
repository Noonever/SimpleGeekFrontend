import { createBrowserRouter, RouterProvider, useLocation, } from "react-router-dom";

import ShopLayout from "./layouts/ShopLayout";

import Home from "./routes/Home";

import CatalogOverview from "./routes/CatalogOverview";
import Catalog, { catalogLoader } from "./routes/Catalog";
import Product from "./routes/Product";
import Cart, { cartLoader } from "./routes/Cart";
import Favorites, { favoritesLoader } from "./routes/Favorites";
import NotFound from "./routes/NotFound";
import Profile from "./routes/Profile";
import Test from "./routes/Test";

import { Verification } from "./routes/Verification";
import { Recovery } from "./routes/Recovery";
import { Settings } from "./routes/Settings";

import "./App.css";
import { useUser } from "./UserContext";
import { Fade } from "@mui/material";


const pageTitles = {
	index: "Главная",
	catalog: "Каталог",
	cart: "Корзина",
	favorites: "Избранное",
	profile: "Профиль",
	notFound: "404",
}

function TransitionWrapper({ children }: { children: React.ReactNode }) {
	// This is used to trigger the transition effect on page change
	const location = useLocation();

	return (
		<Fade in={true} key={location.key} timeout={400}>
			<div>	
				{children}
			</div>
		</Fade>
	);
}

export default function App() {
	const { state: userState } = useUser();
	const router = createBrowserRouter([
		{
			path: '/admin',
			element: <h1>Admin</h1>
		},
		{
			path: "/",
			element: (
				<ShopLayout />
			),
			children: [
				{
					path: "test",
					element: <Test />
				},
				{
					index: true,
					element: <TransitionWrapper><Home pageTitle={pageTitles.index} /></TransitionWrapper>
				},
				{
					path: "product/:id",
					element: <TransitionWrapper><Product /></TransitionWrapper>,
				},
				{
					path: "catalog",
					children: [
						{
							index: true,
							element: <TransitionWrapper><CatalogOverview pageTitle={pageTitles.catalog} /></TransitionWrapper>
						},
						{
							path: ":categoryName",
							element: <TransitionWrapper><Catalog /></TransitionWrapper>,
							loader: catalogLoader,
							errorElement: <h1>Not found wtf</h1>,
						},
					]
				},
				{
					path: "cart",
					element: <TransitionWrapper><Cart pageTitle={pageTitles.cart} /></TransitionWrapper>,
					loader: () => { return cartLoader(userState.cart) }
				},
				{
					path: "favorites",
					element: <TransitionWrapper><Favorites pageTitle={pageTitles.favorites} /></TransitionWrapper>,
					loader: () => { return favoritesLoader(userState.favorites) }
				},
				{
					path: "profile",
					element: <TransitionWrapper><Profile /></TransitionWrapper>
				},
				{
					path: "*",
					element: <NotFound pageTitle={pageTitles.notFound} />,
				}
			],
		},
		
		{
			path: '/verification',
			element: <div className="authwrapper"><Verification /></div>
		},
		{
			path: '/recovery',
			element: <div className="authwrapper"><Recovery /></div>
		},
		{
			path: '/settings',
			element: <div className="authwrapper"><Settings /></div>
		},
	]);

	return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

// if (import.meta.hot) {
// 	import.meta.hot.dispose(() => router.dispose());
// }