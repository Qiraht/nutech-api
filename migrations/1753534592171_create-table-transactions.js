/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('transactions', {
      id: {
        type: 'VARCHAR(50)',
        primaryKey: true,
      },
      user_id: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'users(id)',
        referencesConstraintName: 'fk_transactions.user_id_users.id',
        onDelete: 'CASCADE',
      },
      type_id: {
        type: 'VARCHAR(50)',
        notNull: true,
        references: 'transaction_types(id)',
        referencesConstraintName: 'fk_transaction.type_id_transaction_type.id',
        onDelete: 'CASCADE',
      },
      invoice_number: {
        type: 'VARCHAR(50)',
        notNull: true,
        unique: true,
      },
      total_amount: {
        type: 'DECIMAL(15,2)',
        notNull: true,
      },
      created_on: {
        type: 'TIMESTAMPTZ',
        notNull: true,
      },
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('transactions', { cascade: true });
};
