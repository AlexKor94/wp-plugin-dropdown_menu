import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, List } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from "@wordpress/components";

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    const { title, links, type } = attributes;
    return (
      <>
        <TextControl
          label={__('Navigation Title', 'sub-menu')}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
        />
        <List
        />
      </>
    );
  },
  save({ attributes }) {
    const { title, links, type } = attributes;
    <List
    />
  },
});
