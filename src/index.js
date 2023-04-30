import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl } from "@wordpress/components";

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    return (
      <>
        <RichText tagName='nav' placeholder={__('Enter text...', 'sub-menu')} />
      </>
    );
  },
  save({ attributes }) {
    return (
      <div>
      </div>
    );
  },
});
