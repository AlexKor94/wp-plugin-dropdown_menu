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
    const { linkTitle, link, subItems } = menu;

    return (
      <>
        <TextControl label={__('Menu Title')} value={title} onChange={(title) => setAttributes({ title })} />
      </>
    );
  }
});
