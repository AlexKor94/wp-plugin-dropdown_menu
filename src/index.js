import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText, List } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

registerBlockType(block.name, {
  edit({ attributes, setAttributes }) {
    const { title, links, type } = attributes;
    const menuAdding = () => {
      return (
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
      )
    }

    return (
      <>
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
        <button onClick={() => menuAdding()}>
          {__('Add Menu')}
        </button>
      </>
    );
  }
});
