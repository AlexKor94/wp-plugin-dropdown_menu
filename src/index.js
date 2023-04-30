import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, List } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl } from "@wordpress/components";

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
        <SelectControl
          label={__('Navigation Type')}
          options={[
            { label: __('Unordered List'), value: 'unordered' },
            { label: __('Ordered List'), value: 'ordered' },
          ]}
          value={type}
          onChange={(value) => setAttributes({ type: value })}
        />
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <TextControl
                value={link}
                onChange={(value) => {
                  const newLinks = [...links];
                  newLinks[index] = value;
                  setAttributes({ links: newLinks });
                }}
              />
            </li>
          ))}
        </ul>
        <button onClick={() => setAttributes({ links: [...links, ''] })}>
          {__('Add Link')}
        </button>
      </div>
    );
  },
  save({ attributes }) {
    const { title, links, type } = attributes;
    const List = type === 'unordered' ? 'ul' : 'ol';
    return (
      <div>
        {title && <h2>{title}</h2>}
        <nav>
          <List>
            {links.map((link, index) => (
              <li key={index}>
                <a href={link}>{link}</a>
              </li>
            ))}
          </List>
        </nav>
      </div>
    );
  },

});
