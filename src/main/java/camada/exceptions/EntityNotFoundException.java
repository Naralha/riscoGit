package camada.exceptions;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

public class EntityNotFoundException extends RuntimeException {

    public EntityNotFoundException(Class entity, String... searchParams) {
        super(messageGenerator(entity.getSimpleName(), toMap(String.class, String.class, searchParams)));
    }

    private static String messageGenerator(String entity, Map<String, String> params) {
        return entity + " não encontrado(a) com os parâmetros " + params;
    }

    private static <K, V> Map<K, V> toMap(Class<K> keyType, Class<V> valueType, Object... entries) {
        if (entries.length % 2 == 1) {
            throw new IllegalArgumentException("Entrada inválida");
        }
        return IntStream.range(0, entries.length / 2).map(i -> i * 2)
                .collect(HashMap::new,
                        (m, i) -> m.put(keyType.cast(entries[i]), valueType.cast(entries[i + 1])),
                        Map::putAll);
    }

}
