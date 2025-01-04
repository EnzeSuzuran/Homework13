import {expect} from "chai";
import sinon from "sinon";
import {fetchUsers} from '../src/users.js';

describe('Проверка функции: fetchUsers', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('должна получать и выводить имена пользователей', async () => {
        const testUsers = [
            { id: 1, name: 'John Doe'},
            { id: 2, name: 'Jane Smith'}
        ];

        global.fetch = sandbox.stub().resolves({
            ok: true,
            json: async () => testUsers
        });

        const consoleLogSpy = sandbox.spy(console, 'log');

        await fetchUsers();
        expect(global.fetch.calledOnce).to.be.true;
        expect(global.fetch.calledWith('https://jsonplaceholder.typicode.com/users')).to.be.true;

        expect(consoleLogSpy.calledWith('John Doe')).to.be.true;
        expect(consoleLogSpy.calledWith('Jane Smith')).to.be.true;
    });

    it('должна обрабатывать ошибки при неудачном запросе', async () => {
        global.fetch = sandbox.stub().resolves({
            ok: false,
            status: 404
        });

        try {
            await fetchUsers();
            expect.fail('Функция должна была выбросить ошибку');
        } catch (error) {
            expect(error.message).to.include('HTTP error! status: 404');
        }
    });

});