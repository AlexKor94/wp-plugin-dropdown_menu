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
    function PagesList({ pages }) {
      return (
        <ul>
          {pages?.map(page => (
            <li key={page.id}>
              {decodeEntities(page.title.rendered)}
            </li>
          ))}
        </ul>
      )
    }

    const pages = useSelect(
      select =>
        select(coreDataStore).getEntityRecords('postType', 'page'),
      []
    );

    const { title, links, type } = attributes;
    return (
      <PagesList pages={pages} />
    );
  }
});
