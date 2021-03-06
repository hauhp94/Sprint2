package c0321g1_gaming.model.repository.address;

import c0321g1_gaming.model.entity.address.Commune;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommuneRepository extends JpaRepository<Commune,Long> {
    @Query(value="select * from commune where district_id = ?1", nativeQuery = true)
    List<Commune> getCommuneList(Long id);
}
