import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
	return (
		<button className={` ${styles[type]} ${styles.btn} `} onClick={onClick}>
			{children}
		</button>
	);
}

Button.propTypes = {
	children: PropTypes.element,
	onClick: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
