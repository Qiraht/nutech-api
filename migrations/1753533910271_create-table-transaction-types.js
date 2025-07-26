/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('transaction_types', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        }, 
        type: {
            type: 'TEXT',
            notNull: true,
            unique: true,
        },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('transaction_types', { cascade: true });
};
