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
    invoice_number: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users(id)',
      referencesConstraintName: 'fk_transactions.user_id_users.id',
      onDelete: 'CASCADE',
    },
    service_id: {
      type: 'VARCHAR(50)',
      references: 'services(id)',
      referencesConstraintName: 'fk_transactions.service_id_services.id',
      onDelete: 'CASCADE',
    },
    transaction_type: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    description: {
      type: 'TEXT',
    },
    total_amount: {
      type: 'DECIMAL(15,2)',
      notNull: true,
      check: 'total_amount >= 0',
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
