'use client';

import React from 'react';
import styles from './InventoryPerformance.module.css';

const ITEMS = [
  { id: 1, name: 'The Nordic Minimalist', status: 'Active', reach: '1,204', interest: '8', price: '$85,000' },
  { id: 2, name: 'Modern A-Frame', status: 'Pending', reach: '850', interest: '4', price: '$112,000' },
  { id: 3, name: 'Desert Escape', status: 'Active', reach: '2,100', interest: '16', price: '$72,500' },
];

export default function InventoryPerformance() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h3>Inventory & Performance</h3>
        <button className={styles.filterBtn}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filter
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Portfolio Item</th>
              <th>Status</th>
              <th>Reach</th>
              <th>Interest</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item) => (
              <tr key={item.id}>
                <td className={styles.itemName}>{item.name}</td>
                <td>
                  <span className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                    {item.status}
                  </span>
                </td>
                <td>{item.reach}</td>
                <td>{item.interest}</td>
                <td>{item.price}</td>
                <td className={styles.actions}>
                  <button className={styles.moreBtn}>•••</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
