import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls, RichText, List } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

registerBlockType(block.name, {

  edit({ attributes, setAttributes }) {

    const { title, links, type, items } = attributes;

    const addLink = () => {
      setAttributes({ links: [...links, ''] });
    };

    const addSubMenu = () => {
      setAttributes({ items: [...items, { title: '', links: [] }] });
    };

    const updateSubMenu = (index, newSubmenu) => {
      const newItems = [...items];
      newItems[index] = newSubmenu;
      setAttributes({ items: newItems });
    };

    const updateLink = (index, newLink) => {
      const newLinks = [...links];
      newLinks[index] = newLink;
      setAttributes({ links: newLinks });
    };

    const updateTitle = (newTitle) => {
      setAttributes({ title: newTitle });
    };

    const renderLink = (link, index) => (
      <li key={index}>
        <TextControl
          value={link}
          onChange={(value) => updateLink(index, value)}
        />
      </li>
    );

    const renderSubMenu = (item, index) => (
      <li key={index}>
        <TextControl
          value={item.title}
          onChange={(value) => updateSubMenu(index, { ...item, title: value })}
        />
        <ul>
          {item.links.map((link, subIndex) => renderLink(link, subIndex))}
          <li>
            <Button isDefault onClick={() => {
              updateSubMenu(index, { ...item, links: [...item.links, ''] });
            }}>{__('Add Link')}</Button>
          </li>
        </ul>
      </li>
    );

    return (
      <>
        <InspectorControls>
          <PanelBody title={__('Menu Settings')}>
            <TextControl
              label={__('Title')}
              value={title}
              onChange={(value) => updateTitle(value)}
            />
            <Button onClick={addLink}>{__('Add Link')}</Button>
            <Button onClick={addSubMenu}>{__('Add Submenu')}</Button>
          </PanelBody>
        </InspectorControls>
        <ul>
          {links.map((link, index) => renderLink(link, index))}
          {items.map((item, index) => renderSubMenu(item, index))}
        </ul>
      </>
    );

  }
});
