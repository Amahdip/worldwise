import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

function AppNav() {
	return (
		<nav className={styles.nav}>
			<ul>
				<li>
					<NavLink to='cities'>Cities</NavLink>
				</li>
				<li>
					<NavLink to='countries'>Countreis</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default AppNav;
