import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from "@wordpress/components";

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Custom Link', 'my-plugin')}>
            <TextControl
              label={__('Custom Link', 'my-plugin')}
              value={attributes.myCustomLink}
              onChange={(value) => setAttributes({ myCustomLink: value })}
            />
          </PanelBody>
        </InspectorControls>
        <p>some content</p>
      </>
    );
  },

  save({ attributes }) {
    return (
      <div>
        <p>some content</p>
      </div>
    );
  },
});