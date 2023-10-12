import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth } from "../contexts/FakeAuthContext";

function PageNav() {
	const { logout } = useAuth();
	const { isAuthenticated } = useAuth();

	const handleClick = (e) => {
		e.preventDefault();
		logout();
	};
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/pricing'>Pricing</NavLink>
				</li>
				<li>
					<NavLink to='/product'>Product</NavLink>
				</li>
				{!isAuthenticated ? (
					<li>
						<NavLink to='/login' className={styles.ctaLink}>
							Login
						</NavLink>
					</li>
				) : (
					<NavLink onClick={handleClick} to='/' className={styles.ctaLinkOut}>
						logout
					</NavLink>
				)}
			</ul>
		</nav>
	);
}

export default PageNav;
