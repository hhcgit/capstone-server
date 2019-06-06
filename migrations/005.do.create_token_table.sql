CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE expire_keys (
    time_created timestamp NOT NULL DEFAULT NOW(),
    user_id INTEGER REFERENCES cactus_users(id) ON DELETE CASCADE NOT NULL,
    token uuid DEFAULT uuid_generate_v4());

CREATE FUNCTION IF NOT EXISTS expire_keys_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    DELETE FROM expire_keys WHERE time_created < NOW() - INTERVAL '1 hour';
    RETURN NEW;
END;
$$;
CREATE TRIGGER expire_keys_delete_trigger
    AFTER INSERT ON expire_keys
    EXECUTE PROCEDURE expire_keys_delete();