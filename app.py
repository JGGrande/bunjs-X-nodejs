# //mais perfomatico

import threading
import requests
import time

from datetime import timedelta

def make_request():
    MAX_REQUESTS = 3000
    requests_made = 0
    start_time = time.time()

    def request_thread():
        nonlocal requests_made
        while time.time() - start_time < 60 and requests_made < MAX_REQUESTS:
            try:
                response = requests.post("http://localhost:3000/")
                # Obtenha o corpo da resposta
                body = response.text
            except Exception as e:
                print(f"Erro na requisição: {e}")
            else:
                requests_made += 1

    # Crie uma lista de threads
    threads = []

    # Inicie várias threads para fazer as solicitações
    for _ in range(10):  # Você pode ajustar o número de threads conforme necessário
        thread = threading.Thread(target=request_thread)
        thread.start()
        threads.append(thread)

    # Aguarde até que todas as threads terminem
    for thread in threads:
        thread.join()

    print(f"Feitas {requests_made} requisições")
    end_time = time.time()
    print(f"Tempo total de execução: {timedelta(seconds=end_time - start_time)}")

if __name__ == "__main__":
    make_request()
