package camada.exceptions;

public class EntityWithoutRegistrationInDatabaseException extends RuntimeException {

    public EntityWithoutRegistrationInDatabaseException(Class entity) {
        super("Nenhum registo encontrado para " + entity.getSimpleName());
    }
}
