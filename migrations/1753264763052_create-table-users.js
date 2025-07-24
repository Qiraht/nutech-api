/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
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
        profile_image: {
            type: 'TEXT',
        },
        balance: {
            type: 'DECIMAL(15,2)',
            notNull: true,
            default: 0.00,
        },
        created_at: {
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
export const down = (pgm) => {
    pgm.dropTable('users', { options: 'CASCADE' });
};
