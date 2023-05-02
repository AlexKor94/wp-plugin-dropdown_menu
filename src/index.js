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
    const { title } = attributes;
    const [menu, setMenu] = useState(attributes.menu);

    const handleMenuChange = (newMenu) => {
      setMenu(newMenu);
    };

    const handleSaveClick = () => {
      setAttributes({ menu });
    };
    return (
      <>
        <TextControl
          label={__("Menu Title")}
          value={attributes.title}
          onChange={(title) => setAttributes({ title })}
        />

        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              <span className="opener">
                <TextControl
                  label={__("Item")}
                  value={item.linkTitle}
                  onChange={(linkTitle) => {
                    const newMenu = [...menu];
                    newMenu[index].linkTitle = linkTitle;
                    handleMenuChange(newMenu);
                  }}
                />
              </span>
              <ul>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <TextControl
                      label={__("SubItem")}
                      value={subItem.itemName}
                      onChange={(itemName) => {
                        const newMenu = [...menu];
                        newMenu[index].subItems[subIndex].itemName = itemName;
                        handleMenuChange(newMenu);
                      }}
                    />
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  const newMenu = [...menu];
                  newMenu[index].subItems.push({ itemName: "" });
                  handleMenuChange(newMenu);
                }}
              >
                {__("Add SubItem")}
              </Button>
            </li>
          ))}
        </ul>

        <Button
          onClick={() => {
            const newMenu = [...menu];
            newMenu.push({ linkTitle: "", subItems: [{ itemName: "" }] });
            handleMenuChange(newMenu);
          }}
        >
          {__("Add Item")}
        </Button>

        <Button onClick={handleSaveClick}>{__("Save")}</Button>
      </>
    );
  }

});
