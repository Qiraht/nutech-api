/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.addColumn('services', {
      type_id: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'transaction_types(id)',
        referencesConstraintName: 'fk_transaction.type_id_transaction_type.id',
        onDelete: 'CASCADE',
      },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropColumns('albums', 'type_id', { cascade: true });
};
