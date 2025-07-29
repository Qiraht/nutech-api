/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('services', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    code: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    icon: {
      type: 'TEXT',
      notNull: true,
    },
    tariff: {
      type: 'NUMERIC(15,2)',
      notNull: true,
      default: 0.0,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('services', { cascade: true });
};
