import { registerBlockType } from '@wordpress/blocks';
import block from "./block.json";
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { InspectorControls, RichText, List, BlockControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, Button, Toolbar } from "@wordpress/components";
import { useSelect } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { Icon } from '@wordpress/icons';

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

    const handleDeleteItemClick = (index) => {
      const newMenu = [...menu];
      newMenu.splice(index, 1);
      handleMenuChange(newMenu);
    };

    const handleDeleteSubItemClick = (itemIndex, subItemIndex) => {
      const newMenu = [...menu];
      newMenu[itemIndex].subItems.splice(subItemIndex, 1);
      handleMenuChange(newMenu);
    };

    const handleLinkChange = (index, newLink) => {
      const newMenu = [...menu];
      newMenu[index].link = newLink;
      handleMenuChange(newMenu);
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
                <RichText
                  placeholder={__('Enter Item')}
                  value={item.linkTitle}
                  href={item.link}
                  onChange={(linkTitle) => {
                    const newMenu = [...menu];
                    newMenu[index].linkTitle = linkTitle;
                    handleMenuChange(newMenu);
                  }}
                  onChangeHref={(linkHref) => {
                    const newMenu = [...menu];
                    newMenu[index].link = linkHref;
                    handleMenuChange(newMenu);
                  }}
                />
                <Button onClick={() => handleDeleteItemClick(index)}>
                  {__("Delete Item")}
                </Button>
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
                    <Button
                      onClick={() =>
                        handleDeleteSubItemClick(index, subIndex)
                      }
                    >
                      {__("Delete SubItem")}
                    </Button>
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
            newMenu.push({ linkTitle: "", subItems: [] });
            handleMenuChange(newMenu);
          }}
        >
          {__("Add Item")}
        </Button>

        {console.log(menu)}

        <Button onClick={handleSaveClick}>{__("Save")}</Button>

      </>

    );
  },
  save({ attributes }) {
    const { title, menu } = attributes;
    return (
      <>
        <p>
          {attributes.title}
        </p>
        <ul>
          {menu.map((item, index) => (
            <li key={index}>
              {item.subItems.length > 0 ? <span className="opener">
                <RichText.Content

                  value={item.linkTitle}
                  href={item.link}
                />
              </span>
                :
                <RichText.Content

                  value={item.linkTitle}
                  href={item.link}
                />}

              <ul>
                {item.subItems.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    {subItem.itemName}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    );
  },
});
