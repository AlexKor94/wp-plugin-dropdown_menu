import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls, RichText, List } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

registerBlockType(block.name, {

  edit({ attributes, setAttributes }) {
    const { menu, title } = attributes;

    function Menu({ menu, setMenu }) {
      const [newItemTitle, setNewItemTitle] = useState('');

      const onAddItem = () => {
        const newItems = [...menu.items, { title: newItemTitle, submenu: [] }];
        setMenu({ ...menu, items: newItems });
        setNewItemTitle('');
      };

      const onAddSubmenu = (index) => {
        const newItems = [...menu.items];
        newItems[index].submenu.push({ title: '', submenu: [] });
        setMenu({ ...menu, items: newItems });
      };

      const onTitleChange = (value) => {
        setAttributes({ title });
      };

      const onItemTitleChange = (index, value) => {
        const newItems = [...menu.items];
        newItems[index].title = value;
        setMenu({ ...menu, items: newItems });
      };

      const onSubmenuTitleChange = (itemIndex, submenuIndex, value) => {
        const newItems = [...menu.items];
        newItems[itemIndex].submenu[submenuIndex].title = value;
        setMenu({ ...menu, items: newItems });
      };

      const onItemTypeChange = (value) => {
        setMenu({ ...menu, type: value });
      };

      const renderItem = (item, index) => {
        return (
          <li key={index}>
            <TextControl value={item.title} onChange={(value) => onItemTitleChange(value)} />
            <Button onClick={() => onAddSubmenu(index)}>{__('Add Submenu')}</Button>
            {item.submenu.length > 0 && (
              <ul>
                {item.submenu.map((submenu, submenuIndex) => (
                  <li key={`${index}-${submenuIndex}`}>
                    <TextControl value={submenu.title} onChange={(value) => onSubmenuTitleChange(index, submenuIndex, value)} />
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      };

      return (
        <>
          <TextControl label={__('Menu Title')} value={title} onChange={onTitleChange} />
          <SelectControl
            label={__('Menu Type')}
            value={menu.type}
            options={[
              { label: __('Unordered'), value: 'unordered' },
              { label: __('Ordered'), value: 'ordered' },
            ]}
            onChange={onItemTypeChange}
          />
          <ul>
            {menu.items.map(renderItem)}
            <li>
              <TextControl value={newItemTitle} onChange={(value) => setNewItemTitle(value)} />
              <Button onClick={onAddItem}>{__('Add Item')}</Button>
            </li>
          </ul>
        </>
      );
    }

    const onMenuChange = (newMenu) => {
      setAttributes({ menu: newMenu });
    };

    return (
      <>
        <Menu menu={menu} setMenu={onMenuChange} />
      </>
    );
  }
});
