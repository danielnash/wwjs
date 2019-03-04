const query = require(`${__base}/db/query.js`);

describe('query() - a basic promise wrapper for MySQL queries', () => {

    test('can run basic queries', async () => {
        const result = await query(`
            SELECT 
                123   AS intColumn,
                'str' AS strColumn
        `);

        expect(result).toEqual([
            {
                intColumn: 123,
                strColumn: 'str'
            }
        ]);
    });

    test('can run parametized queries', async () => {
        const testVal = 'Penguin';

        const result = await query(`
            SELECT
                ? AS testColumn
        `, [
            testVal
        ]);

        expect(result).toHaveLength(1);

        expect(result[0]).toEqual({
            testColumn: testVal
        });
    });

    describe('query.first() - run a query and return the first result', () => {

        test('can run a successful query and return only the first result', async () => {
            const testVal = 'Penguin';

            const result = await query.first(`
                SELECT
                    ? AS favouriteAnimal
                UNION ALL
                SELECT
                    'Don''t want this row!' AS favouriteAnimal
            `, [
                testVal
            ]);

            expect(result).toEqual({
                favouriteAnimal: testVal
            });
        });

        test('will return null if query fails', async () => {
    
            // Look for a user that doesn't exist
            const result = await query.first(`
                SELECT * FROM
                    users
                WHERE
                    id = -1
            `);

            expect(result).toBeNull();
        });

    });

});