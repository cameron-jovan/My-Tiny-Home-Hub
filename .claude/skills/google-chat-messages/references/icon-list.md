# Google Chat Known Icons

Icons available via `knownIcon` in decoratedText and button widgets.

## Usage

```typescript
{ startIcon: { knownIcon: 'STAR' } }
// or
{ icon: { knownIcon: 'EMAIL' } }
```

## Available Icons

| Icon Name | Use For |
|-----------|---------|
| `AIRPLANE` | Travel, flights |
| `BOOKMARK` | Save, reference, links |
| `BUS` | Transport, transit |
| `CAR` | Driving, transport |
| `CLOCK` | Time, duration, schedule |
| `CONFIRMATION_NUMBER_ICON` | Tickets, bookings |
| `DESCRIPTION` | Documents, files |
| `DOLLAR` | Money, pricing, cost |
| `EMAIL` | Email, messages |
| `EVENT_PERFORMER` | People, performers |
| `EVENT_SEAT` | Seating, capacity |
| `FLIGHT_ARRIVAL` | Arrivals, incoming |
| `FLIGHT_DEPARTURE` | Departures, outgoing |
| `HOTEL` | Accommodation |
| `HOTEL_ROOM_TYPE` | Room types |
| `INVITE` | Invitations |
| `MAP_PIN` | Location, address |
| `MEMBERSHIP` | Members, users |
| `MULTIPLE_PEOPLE` | Teams, groups |
| `OFFER` | Deals, promotions |
| `PERSON` | Individual user |
| `PHONE` | Phone number, calls |
| `RESTAURANT_ICON` | Food, dining |
| `SHOPPING_CART` | Commerce, purchases |
| `STAR` | Rating, favourite, important |
| `STORE` | Shop, retail |
| `TICKET` | Tickets, events |
| `TRAIN` | Rail transport |
| `VIDEO_CAMERA` | Video, meetings |
| `VIDEO_PLAY` | Play, media |

## Custom Icons

For icons not in the list, use `iconUrl` with any publicly accessible image:

```typescript
{
  startIcon: {
    iconUrl: 'https://example.com/custom-icon.png',
    altText: 'Custom icon description'
  }
}
```

Icon images should be square, ideally 24x24 or 48x48 pixels.

## Material Design Icons

Google Chat's knownIcons are a subset of Material Design icons. For a broader selection, use `iconUrl` pointing to Material Design icon SVGs or your own icon assets.
