# Schema.org Properties Reference

Complete property lists for local business structured data.

## LocalBusiness Properties

Core properties for the homepage JSON-LD block.

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `@type` | string | Yes | `LocalBusiness` or subtype (see below) |
| `name` | string | Yes | Business name as shown to customers |
| `image` | URL | Yes | Primary business image or logo |
| `description` | string | Yes | 1-2 sentence business description |
| `@id` | URL | Yes | Unique ID, use `{url}/#organization` |
| `url` | URL | Yes | Website homepage URL |
| `telephone` | string | Yes | International format: `+61-2-4900-1234` |
| `email` | string | Recommended | Primary contact email |
| `priceRange` | string | Recommended | `$` to `$$$$` |
| `address` | PostalAddress | Yes | See below |
| `geo` | GeoCoordinates | Recommended | Latitude/longitude |
| `openingHoursSpecification` | array | Recommended | See below |
| `areaServed` | array | Recommended | Cities/suburbs served |
| `sameAs` | array | Recommended | Social media profile URLs |
| `taxID` | string | Optional | ABN for Australian businesses |
| `logo` | URL | Optional | Business logo URL |
| `foundingDate` | string | Optional | ISO 8601 date |
| `founder` | Person | Optional | Business founder |
| `numberOfEmployees` | number | Optional | Staff count |
| `paymentAccepted` | string | Optional | e.g. "Cash, Credit Card, EFTPOS" |
| `currenciesAccepted` | string | Optional | `AUD` |

### LocalBusiness Subtypes

Use a more specific type when applicable:

| Subtype | Use for |
|---------|---------|
| `Plumber` | Plumbing services |
| `Electrician` | Electrical services |
| `RoofingContractor` | Roofing |
| `HVACBusiness` | Air conditioning/heating |
| `AutoRepair` | Mechanics |
| `BeautySalon` | Hair/beauty |
| `Dentist` | Dental practices |
| `LegalService` | Law firms |
| `AccountingService` | Accountants |
| `RealEstateAgent` | Real estate |
| `Restaurant` | Restaurants/cafes |
| `BarOrPub` | Pubs/bars |
| `Hotel` | Accommodation |
| `Store` | Retail shops |
| `ProfessionalService` | Generic professional |

### PostalAddress Properties

| Property | Example |
|----------|---------|
| `streetAddress` | `123 Hunter Street` |
| `addressLocality` | `Newcastle` |
| `addressRegion` | `NSW` |
| `postalCode` | `2300` |
| `addressCountry` | `AU` |

### Australian State Codes

| State | Code | Geo Region |
|-------|------|------------|
| New South Wales | NSW | AU-NSW |
| Victoria | VIC | AU-VIC |
| Queensland | QLD | AU-QLD |
| South Australia | SA | AU-SA |
| Western Australia | WA | AU-WA |
| Tasmania | TAS | AU-TAS |
| Northern Territory | NT | AU-NT |
| ACT | ACT | AU-ACT |

### OpeningHoursSpecification

```json
{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "opens": "07:00",
  "closes": "17:00"
}
```

For different weekend hours, add a separate entry:

```json
{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Saturday"],
  "opens": "08:00",
  "closes": "12:00"
}
```

## Service Properties

For individual service pages.

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `name` | string | Yes | Service name |
| `description` | string | Yes | What the service provides |
| `provider` | reference | Yes | `{ "@id": "{url}/#organization" }` |
| `areaServed` | Place | Recommended | City or region |
| `serviceType` | string | Recommended | Category of service |
| `offers` | Offer | Optional | Pricing/availability |
| `hasOfferCatalog` | OfferCatalog | Optional | Multiple service tiers |

## FAQPage Properties

For pages with FAQ sections.

| Property | Type | Required |
|----------|------|----------|
| `mainEntity` | array of Question | Yes |
| `Question.name` | string | Yes |
| `Question.acceptedAnswer` | Answer | Yes |
| `Answer.text` | string | Yes |

## Validation

Always test generated schema at: https://validator.schema.org/

Common errors:
- Missing `@context` — every JSON-LD block needs it
- Wrong phone format — must be international (`+61-...`)
- Missing `@id` — needed for cross-referencing between schemas
- Empty `areaServed` — include at least one city
