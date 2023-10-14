import PropTypes from "prop-types";
import styles from "./style.module.css";

function Button({ children, onClick, type }) {
	return (
		<button className={` ${styles[type]} ${styles.btn} `} onClick={onClick}>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.string,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
