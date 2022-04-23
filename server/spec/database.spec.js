const { DBService } = require('../database/database');

describe("O serviço de banco de dados", () => {
  var ts;
  var obj1 = {
    id: 0,
    song: "All Too Well (10 Minute Version) (Taylor's Version)",
    album: "Red (Taylor's Version)",
    duration: "10:13"
  }
  var obj2 = {
    id: 1,
    song: "right where you left me - bonus track",
    album: "evermore",
    duration: "04:05"
  }
  beforeAll(() => {
    process.stdout.write("database: ");
  });
  beforeEach(() => ts = new DBService('ts'));
  afterAll(() => {console.log('\n')});

  function addObj(obj){
    ts.add(obj);
  }

  function deleteObj(index) {
    ts.delete(index);
  }

  it("tem inicialmente nenhum objeto", () => {
    expect(ts.getData().length).toBe(0);
  });

  it("adiciona objetos", () => {
    addObj(obj1);
    expect(ts.getData().length).toBe(1);
    addObj(obj2);
    expect(ts.getData().length).toBe(2);

    deleteObj(0);
    deleteObj(0);
  });

  it("deleta objetos", () => {
    addObj(obj1);
    addObj(obj2);

    deleteObj(0);
    expect(ts.getData().length).toBe(1);
    deleteObj(0);
    expect(ts.getData().length).toBe(0);
  });

  it("atualiza objetos", () => {
    addObj(obj1);

    ts.update(0, obj2);
    expect(ts.getData()[0].song).toBe(obj2.song);
    expect(ts.getData()[0].album).toBe(obj2.album);
    expect(ts.getData()[0].duration).toBe(obj2.duration);

    deleteObj(0);
  });

  it("retorna o próximo id livre para ser usado para novos objetos", () => {
    addObj(obj1);
    expect(ts.getIdCount()).toBe(1);
    addObj(obj2);
    expect(ts.getIdCount()).toBe(2);

    deleteObj(0);
    deleteObj(0);
  });

})