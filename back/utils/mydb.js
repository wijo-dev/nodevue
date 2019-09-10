module.exports = class {
    constructor(pool) {
        this.pool = pool;
    }

    excute(fn) {
        this.pool.connect(), conn => {
            fn(conn);
        }
    }
}