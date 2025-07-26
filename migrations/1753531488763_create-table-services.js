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
      service_code: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      service_name: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      service_icon: {
        type: 'TEXT',
        notNull: true,
      },
      service_tariff: {
        type: 'DECIMAL(15,2)',
        notNull: true,
        default: 0.00,
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
