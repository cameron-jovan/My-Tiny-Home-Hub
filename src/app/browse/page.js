'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ListingCard from '@/components/ListingCard';
import { db } from '@/lib/firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import Breadcrumbs from '@/components/Breadcrumbs';
import styles from './page.module.css';

const HOME_TYPES = ['Tiny House on Wheels', 'Modular Foundation', 'ADU / Backyard Suite', 'Container Home', 'Park Model'];
const SQ_FT_RANGES = [
  { label: 'Under 250', min: 0, max: 250 },
  { label: '250 - 400', min: 250, max: 400 },
  { label: '400 - 600', min: 400, max: 600 },
  { label: '600+', min: 600, max: 9999 },
];
const AMENITIES = ['Off-grid Ready', 'Solar Packages', 'Smart Home Tech'];

export default function BrowsePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([30000, 250000]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSqFt, setSelectedSqFt] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [location, setLocation] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const q = query(collection(db, 'listings'));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setListings(results);
      } catch (err) {
        console.error('Error fetching listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const toggleType = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleSqFt = (range) => {
    setSelectedSqFt(prev =>
      prev.includes(range.label) ? prev.filter(r => r !== range.label) : [...prev, range.label]
    );
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const filtered = useMemo(() => {
    let results = [...listings];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
      );
    }

    if (selectedTypes.length) {
      results = results.filter(l => selectedTypes.includes(l.type));
    }

    results = results.filter(l => l.price >= priceRange[0] && l.price <= priceRange[1]);

    if (selectedSqFt.length) {
      results = results.filter(l => {
        return selectedSqFt.some(rangeLabel => {
          const range = SQ_FT_RANGES.find(r => r.label === rangeLabel);
          return l.sqft >= range.min && l.sqft <= range.max;
        });
      });
    }

    if (selectedAmenities.length) {
      results = results.filter(l =>
        selectedAmenities.some(a => l.amenities?.includes(a))
      );
    }

    if (sortBy === 'price-low') results.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') results.sort((a, b) => b.price - a.price);
    if (sortBy === 'sqft') results.sort((a, b) => b.sqft - a.sqft);

    return results;
  }, [listings, search, sortBy, priceRange, selectedTypes, selectedSqFt, selectedAmenities]);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  if (loading) return (
    <>
      <Navbar />
      <main className={styles.loadingPage}>
        <div className={styles.loadingSpinner}>Loading listings...</div>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Browse Listings' }]} />
      </div>
      <main className={styles.page}>
        {/* Search Header */}
        <div className={styles.searchHeader}>
          <div className="container">
            <div className={styles.searchRow}>
              <div>
                <p className={styles.searchLabel}>SEARCH YOUR DREAM HOME</p>
                <div className={styles.searchInputWrap}>
                  <span className={styles.searchIcon}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search by model, builder, or feature..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={styles.searchInput}
                    id="browse-search"
                  />
                </div>
              </div>
              <div className={styles.sortWrap}>
                <label className={styles.sortLabel}>SORT BY</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.sortSelect}
                  id="sort-select"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sqft">Largest First</option>
                </select>
              </div>
              <Link href="/browse" className="btn btn-secondary">
                Find Homes
              </Link>
            </div>
          </div>
        </div>

        <div className="container">
          <div className={styles.layout}>
            {/* Filter Sidebar */}
            <aside className={styles.sidebar} id="filter-sidebar">
              <h3 className={styles.filterTitle}>Filters</h3>
              <p className={styles.filterSubtitle}>Narrow your search</p>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>💰 Price Range</h4>
                <div className={styles.priceInputs}>
                  <span className={styles.priceTag}>${(priceRange[0]/1000).toFixed(0)}k</span>
                  <input
                    type="range"
                    min="30000"
                    max="250000"
                    step="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className={styles.rangeSlider}
                  />
                  <span className={styles.priceTag}>${(priceRange[1]/1000).toFixed(0)}k+</span>
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>🏠 Home Type</h4>
                {HOME_TYPES.map(type => (
                  <label key={type} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className={styles.checkbox}
                    />
                    {type}
                  </label>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>📐 Sq Footage</h4>
                <div className={styles.sqftGrid}>
                  {SQ_FT_RANGES.map(range => (
                    <button
                      key={range.label}
                      className={`${styles.sqftBtn} ${selectedSqFt.includes(range.label) ? styles.sqftActive : ''}`}
                      onClick={() => toggleSqFt(range)}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>📍 Location</h4>
                <input
                  type="text"
                  placeholder="Zip code or state..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="input"
                />
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>✨ Amenities</h4>
                {AMENITIES.map(amenity => (
                  <label key={amenity} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className={styles.checkbox}
                    />
                    {amenity}
                  </label>
                ))}
              </div>

              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 'var(--space-md)' }}
                onClick={() => {}}
              >
                Apply Filters
              </button>
            </aside>

            {/* Listings Grid */}
            <div className={styles.results}>
              <div className={styles.listingsGrid}>
                {displayed.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>

              {filtered.length > 6 && !showAll && (
                <div className={styles.loadMore}>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowAll(true)}
                  >
                    Load More Models ↓
                  </button>
                </div>
              )}

              {filtered.length === 0 && (
                <div className={styles.empty}>
                  <p>No listings match your filters. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
