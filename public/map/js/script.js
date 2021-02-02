// Fisrt map loaded
$(document).ready(function () {
    $('.menuButton').click(function () {
        $('.menu').toggle();
    });
    buildPage(allMapData[firstSelectedMap()].data);
});
// Divice Check
var isMobile = 'false';
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
    isMobile = 'true';
}
// Regroup all map Data
var allMapData = [{ data: island_1 }, { data: island_2 }];

function buildPage(mapToLoad) {
    location.hash = mapToLoad.name;
    buildMenu(mapToLoad.name);
    buildMap(mapToLoad);
}

// Detect if there is an #Hash location
function firstSelectedMap() {
    var i = 0;
    if (location.hash === '#Island_1') {
        i = 0;
    } else if (location.hash === '#Island_2') {
        i = 1;
    }
    return i;
}

// Build the user buttons menu
function buildMenu(name) {
    // Reset all buttons
    $('.menu item').show();
    // Remove useless buttons
    if (name == 'Fjolarok') {
        $('#Fjolarok').hide();
    } else if (name == 'Sewer') {
        $('#Sewer, #npcsButton, #carpSchoolButton, .events, #fishingButton, #halloweenButton, .emptyLine1').hide();
    } else if (name == 'Cave') {
        $('#Cave, #carpSchoolButton, .events, #fishingButton, #halloweenButton, .emptyLine1').hide();
    } else if (name == 'Temple') {
        $('#Temple, #npcsButton, #carpSchoolButton, #othersButton, .events, #fishingButton, #halloweenButton, .emptyLine1').hide();
    }
}

// Build the Leaflet Map
function buildMap(mapToLoad) {
    // Declare Map Object
    var map = L.map('map', {
        zoomControl: false,
    }).setView(mapToLoad.setView, 2);
    // Relerence the Tiles
    L.tileLayer('./data/tiles/' + mapToLoad.name + '/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 3,
        noWrap: true,
        bounds: L.latLngBounds(L.latLng(-90, -180) /*SW*/, L.latLng(90, 180) /*NE*/),
    }).addTo(map);
    L.control
        .zoom({
            position: 'bottomright',
        })
        .addTo(map);

    // Remove Default Leaflet Attribution + Adding a custom one
    $('.leaflet-control-attribution').hide();
    $('.attribution').html('Powered by <a target="_blank" rel="noopener noreferrer" href="https://leafletjs.com/">Leaflet</a>');

    // Markers Creation
    var buttonData = [
        (Monsters = {
            id: 'monstersButton',
            content: 'Monsters',
            layerGroup: L.layerGroup(),
        }),
        (Dungeons = {
            id: 'dungeonsButton',
            content: 'Dungeons',
            layerGroup: L.layerGroup(),
        }),
    ];

    mapToLoad.popup.forEach(mapDataFunction);
    function mapDataFunction(mapData) {
        for (var i = 0; i < mapData.NumberOfCoord; i++)
            L.marker(mapData.coord[i], { icon: L.icon({ iconUrl: mapData.icon, iconSize: [30, 30], iconAnchor: [15, 18], popupAnchor: [-3, -15] }) })
                .on(isMobile == 'false' ? 'mouseover' : '', function (e) {
                    this.openPopup();
                })
                .on(isMobile == 'false' ? 'mouseout' : '', function (e) {
                    this.closePopup();
                })
                .on(isMobile == 'false' ? 'click' : '', function () {
                    isMobile == 'false' ? window.open(mapData.popupLink[1], mapData.popupLink[0]) : '';
                })
                .bindPopup(
                    '<center><font color="#48edff">' +
                        mapData.popupTitle +
                        '</font></center>' +
                        mapData.popupBody +
                        '<center><b><i><font color="#929398">' +
                        (isMobile == 'false'
                            ? ''
                            : '<a target="' + mapData.popupLink[0] + '" rel="noopener noreferrer" href=' + mapData.popupLink[1] + '>') +
                        mapData.popupLinkText +
                        '</a></font></i></b></center>'
                )
                .addTo(mapData.layerGroup == 'monsters' ? buttonData[0].layerGroup : buttonData[1].layerGroup);
    }
    // Enable Monsters/Dungeons Markers by default
    buttonData[0].layerGroup.addTo(map);
    buttonData[1].layerGroup.addTo(map);

    // Menu
    const okBox = '<img class="menuImg" src="./data/asset/Main/okBox.png">';
    const emptyBox = '<img class="menuImg" src="./data/asset/Main/emptyBox.png">';

    $('.zoneName').html(mapToLoad.name);
    $('.maps').html('Zones');

    for (i = 0; i < buttonData.length; i++) {
        $('#' + buttonData[i].id).html(okBox + buttonData[i].content);
    }

    var i = 0;
    document.getElementById(buttonData[i++].id).onclick = function () {
        toggleButton(buttonData[0]);
    };
    document.getElementById(buttonData[i].id).onclick = function () {
        toggleButton(buttonData[1]);
    };

    function toggleButton(buttonData) {
        if ($('#' + buttonData.id).html() == okBox + buttonData.content) {
            map.removeLayer(buttonData.layerGroup);
        } else {
            buttonData.layerGroup.addTo(map);
        }
        $('#' + buttonData.id).html(($('#' + buttonData.id).html() == okBox + buttonData.content ? emptyBox : okBox) + buttonData.content);
    }

    $('#Island-1').html('<img class="menuImg" src="./data/asset/Main/iconDungeon.png"/>' + 'Island-1');
    document.getElementById('Island-1').onclick = function () {
        switchMap(0);
    };
    $('#Island-2').html('<img class="menuImg" src="./data/asset/Main/iconDungeon.png"/>' + 'Island-2');
    document.getElementById('Island-2').onclick = function () {
        switchMap(1);
    };

    function switchMap(i) {
        map.remove();
        buildPage(allMapData[i].data);
    }

    // var devTool = L.marker([0, 0], {
    //     draggable: true,
    // }).addTo(map);
    // devTool.bindPopup(
    //     '<span style="color: #48edff; font-family: none; font-size: 16px;"><center>Move me to know a position<br>Dev Tool</center></span>'
    // );
    // devTool.on('dragend', function (e) {
    //     devTool
    //         .getPopup()
    //         .setContent(
    //             '<span style="font-family: none; font-size: 16px;"><center>Clicked ' +
    //                 devTool.getLatLng().toString() +
    //                 '<br>' +
    //                 'Pixels ' +
    //                 map.project(devTool.getLatLng(), map.getMaxZoom().toString()) +
    //                 '<br><br>' +
    //                 '<font color="#48edff">Move me to know a position<br>Dev Tool</font></center></span>'
    //         )
    //         .openOn(map);
    // });
}