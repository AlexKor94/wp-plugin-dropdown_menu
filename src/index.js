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
    const { title, menu } = attributes;

    const onAddItem = (arr) => {
      const newMenu = [...menu, arr];
      setAttributes({ menu: newMenu });
    };

    return (
      <>
        <TextControl label={__('Menu Title')} value={title} onChange={(title) => setAttributes({ title })} />

        <ul>
          {
            menu.map(element => {
              return (
                <li>
                  <span className='opener'>
                    <TextControl
                      label={__('Item')}
                      value={element.linkTitle} />
                  </span>
                  <ul>
                    {element.subItems.map(el => {
                      return (
                        <li>
                          <TextControl
                            label={__('SubItem')}
                            value={el.itemName} />
                        </li>
                      )
                    })}
                  </ul>
                  <Button>{__('Add SubItem')}</Button>
                </li>
              );
            })
          }
        </ul>

        <Button>{__('Add Item')}</Button>
      </>
    );
  }

});
