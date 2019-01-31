/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './styles/style.scss';
import './styles/editor.scss';
import icons from './components/icons';
import Edit from './components/edit';
import svgs from './components/svgs';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock } = wp.blocks;
const { RichText, getColorClassName, getFontSizeClass } = wp.editor;

/**
 * Set default icon size equivalent to "Medium".
 */
export const DEFAULT_ICON_SIZE = 60;

/**
 * Block constants
 */
const name = 'icon';

const title = __( 'Icon' );

const icon = icons.icon;

const keywords = [
	__( 'icons' ),
	__( 'coblocks' ),
];

const blockAttributes = {
	icon: {
		type: 'string',
		default: 'heart',
	},
	iconRand: {
		type: 'boolean',
		default: true,
	},
	iconSize: {
		type: 'string',
		default: 'medium',
	},
	contentAlign: {
		type: 'string',
	},
	hasContentAlign: {
		type: 'boolean',
		default: true,
	},
	backgroundColor: {
		type: 'string',
	},
	iconColor: {
		type: 'string',
	},
	customBackgroundColor: {
		type: 'string',
	},
	customIconColor: {
		type: 'string',
	},
	height: {
		type: 'number',
		default: DEFAULT_ICON_SIZE,
	},
	width: {
		type: 'number',
		default: DEFAULT_ICON_SIZE,
	},
	borderRadius: {
		type: 'number',
		default: 0,
	},
	padding: {
		type: 'number',
		default: 0,
	},
};

const settings = {

	title: title,

	description: __( 'Add a stylized graphic symbol to communicate something more.' ),

	keywords: keywords,

	attributes: blockAttributes,

	edit: Edit,

	styles: [
		{ name: 'outlined', label: __( 'Outlined' ), isDefault: true },
		{ name: 'filled', label: __( 'Filled' ) },
	],

	save( { attributes, className } ) {

		const {
			icon,
			backgroundColor,
			customBackgroundColor,
			customIconColor,
			contentAlign,
			iconColor,
			height,
			width,
			borderRadius,
			padding,
		} = attributes;

		let iconStyle = 'outlined';

		if ( className ) {
			if ( className.includes( 'is-style-filled' ) ) {
				iconStyle = 'filled';
			}
		}

		const textClass = getColorClassName( 'color', iconColor );
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );

		const classes = classnames( 'wp-block-coblocks-icon__inner', {
			'has-text-color': iconColor || customIconColor,
			[ textClass ]: textClass,
			'has-background': backgroundColor || customBackgroundColor,
			[ backgroundClass ]: backgroundClass,
		} );

		const styles = {
			backgroundColor: backgroundClass ? undefined : customBackgroundColor,
			color: textClass ? undefined : customIconColor,
			fill: textClass ? undefined : customIconColor,
			height: height,
			width: width,
			borderRadius: borderRadius ? borderRadius + 'px' : undefined,
			padding: padding ? padding + 'px' : undefined,
		};

		return (
			<div className={ className } style={ { textAlign: contentAlign ? contentAlign : undefined } }>
				<div className={ classes } style={ styles }>
					{ svgs[ iconStyle ][ icon ].icon }
				</div>
			</div>
		);
	},
};

export { name, title, icon, settings };