exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(50)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    first_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    last_name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    balance: {
      type: 'NUMERIC(15,2)',
      notNull: true,
      default: 0.0,
      check: 'balance >= 0',
    },
    created_at: {
      type: 'TIMESTAMPTZ',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users', { cascade: true });
};
