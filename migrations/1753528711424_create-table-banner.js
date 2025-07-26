/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('banner', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      banner_name: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      banner_image: {
        type: 'TEXT',
        notNull: true,
      },
      description: { 
        type: 'TEXT', 
        notNull: true 
      },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('banner', { cascade: true });
};
