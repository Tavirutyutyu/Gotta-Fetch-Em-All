import fetchData from "../Utils";

function ListElement({text, url, isAreasShown, onAreaSelect, onLocationSelect}) {


  async function getAreas(url) {
    const areas = await fetchData(url);
    if (!isAreasShown) {
      onAreaSelect(areas.areas);
    } else {
      onLocationSelect(areas);
    }
  }

  return <li onClick={async () => await getAreas(url)}>{text}</li>;
}

export default ListElement;
