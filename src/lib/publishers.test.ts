import { beforeEach, describe, expect, it } from 'vitest';
import { publishers } from '../../db/schema';
import { createTestDatabase } from '../../db/test-helpers';
import type { Database } from './db';
import { getAllPublishers } from './publishers';

describe('getAllPublishers', () => {
    let db: Database;

    beforeEach(async () => {
        db = await createTestDatabase();
    });

    it('returns publisher ids and names ordered by name', async () => {
        await db.insert(publishers).values([
            { name: 'Zeta Works', description: 'Last alphabetically' },
            { name: 'Alpha Studio', description: 'First alphabetically' },
        ]);

        const allPublishers = await getAllPublishers(db);

        expect(allPublishers).toEqual([
            { id: expect.any(Number), name: 'Alpha Studio' },
            { id: expect.any(Number), name: 'Zeta Works' },
        ]);
    });
});
