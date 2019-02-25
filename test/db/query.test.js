const query = require('./../../src/db/query.js');

describe('query() - a basic promise wrapper for MySQL queries', () => {

    test('can run basic queries', async () => {
        const result = await query(`
            SELECT 
                123   AS IntColumn,
                'str' AS StrColumn
        `);

        expect(result).toEqual([
            {
                IntColumn: 123,
                StrColumn: 'str'
            }
        ]);
    });

    test('can run parametized queries', async () => {
        const testVal = 'Penguin';

        const result = await query(`
            SELECT
                ? AS TestColumn
        `, [
            testVal
        ]);

        expect(result).toHaveLength(1);

        expect(result[0]).toEqual({
            TestColumn: testVal
        });
    });

});