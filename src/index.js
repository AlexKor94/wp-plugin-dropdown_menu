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
    function setLinks(newLinks) {
      setAttributes({ links: newLinks });
    }

    function Menu({ links, setLinks }) {
      const renderItem = (link, index) => (
        <li key={index}>
          <TextControl
            value={link}
            onChange={(value) => {
              const newLinks = [...links];
              newLinks[index] = value;
              setLinks(newLinks);
            }}
          />
        </li>
      );

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
      );
    }

    const { title, links, type } = attributes;

    const addLink = () => {
      setAttributes({ links: [...links, ''] });
    };

    const addMenu = () => {
      const newMenu = Array(3).fill('');
      setAttributes({ links: [...links, newMenu] });
    };

    return (
      <>
        <Menu links={links} setLinks={setAttributes} />
        <button onClick={addLink}>{__('Add Link')}</button>
        <button onClick={addMenu}>{__('Add Menu')}</button>
      </>
    );

  }

});
