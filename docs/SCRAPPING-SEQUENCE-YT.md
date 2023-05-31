# Youtube Scrapping Process

## Scrapping lives {channel}:

1. Ping Channel's page https://www.youtube.com/@sincensuraMedia

2. Scrap SCRIPT tags, and parse JS contents:

```html
<script nonce="dcTX-7d9LRizt8QUxhVHJg">
  var ytInitialData = {
      ...
  }
</script>

<script nonce="dcTX-7d9LRizt8QUxhVHJg">
  var ytInitialPlayerResponse = {
      ...
  }
</script>
```

3. Query Live & Premier Videos:

```js
// Home Tab
const homeTab =
  ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs.find(
    (tab) => tab.tabRenderer.title === "Home" || tab.tabRenderer.title === "Página principal"
  );

// Premieres
const premiers = homeTab.content.sectionListRenderer.contents.filter((videos) => {
    return videos.itemSectionRenderer.contents[0];   
  
  
  .horizontalListRenderer.items.gridVideoRenderer.thumbnailOverlays.some(
    (thumbnail) =>
      thumbnail.thumbnailOverlayTimeStatusRenderer.text.simpleText ===
      "PREMIERE"
  );
});

// Lives
const lives = videosTab.content.sectionListRenderer.contents.filter((video) => {
  return video.richItemRenderer.content.gridVideoRenderer.thumbnailOverlays.some(
    (thumbnail) =>
      thumbnail.thumbnailOverlayTimeStatusRenderer.text.simpleText ===
      "LIVE"
  );
});
```
