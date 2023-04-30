import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, List } from "@wordpress/components";

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    const { title, links, type } = attributes;
    return (
      <div>
        <TextControl
          label={__('Navigation Title')}
          value={title}
          onChange={(value) => setAttributes({ title: value })}
        />
      </div>
    );
  }
});
