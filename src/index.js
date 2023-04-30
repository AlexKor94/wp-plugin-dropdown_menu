import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from "@wordpress/components";

registerBlockType(block.name, {
  // title: __('Custom List'),
  // icon: 'list-view',
  // category: 'common',
  // attributes: {
  //   items: {
  //     type: 'array',
  //     source: 'children',
  //     selector: 'ul',
  //     default: []
  //   }
  // },
  edit({ attributes, setAttributes }) {
    const onChangeItems = (value) => {
      setAttributes({ items: value.split("\n") });
    };

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Custom Link', block.name)}>
            <TextControl
              label={__('Custom Link', block.name)}
              value={attributes.myCustomLink}
              onChange={(value) => setAttributes({ myCustomLink: value })}
            />
          </PanelBody>
        </InspectorControls>
        <ul>
          {attributes.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <TextControl
          label={__('Add item', block.name)}
          value=""
          onChange={(event) => onChangeItems(event.target.value)}
          placeholder={__('Type an item and press Enter', block.name)}
        />
      </>
    );
  },

  save({ attributes }) {
    return (
      <div>
        <ul>
          {attributes.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  },
});
